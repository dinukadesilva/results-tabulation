from orm.entities.SubmissionVersion import TallySheetVersion
from orm.enums import TallySheetCodeEnum
import requests
from app import connex_app


# Push Results to Result Dissemination Service
class ResultPushService:
    PUSH_URL = connex_app.app.config['PUSH_SERVICE_URL']

    def push_result(self, tallysheet_id, tallysheet_version_id):
        tallysheet_version = TallySheetVersion.get_by_id(
            tallySheetId=tallysheet_id,
            tallySheetVersionId=tallysheet_version_id
        )

        if tallysheet_version.tallySheetVersionCode is TallySheetCodeEnum.PRE_30_PD or \
                tallysheet_version.tallySheetVersionCode is TallySheetCodeEnum.PRE_30_ED or \
                tallysheet_version.tallySheetVersionCode is TallySheetCodeEnum.PRE_ALL_ISLAND_RESULTS:
            response = tallysheet_version.json_data()

            url = self.PUSH_URL + response['result_code']
            return requests.post(url, verify=False, json=response)
        return None