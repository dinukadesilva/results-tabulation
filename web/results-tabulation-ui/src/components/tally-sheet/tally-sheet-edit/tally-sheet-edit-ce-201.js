import React, {useState} from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import {
    TALLY_SHEET_ROW_TYPE_BALLOT_BOX,
    TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_ISSUED,
    TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_RECEIVED,
    TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_SPOILT,
    TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_UNUSED,
    TALLY_SHEET_ROW_TYPE_NUMBER_OF_ORDINARY_BALLOTS_IN_BALLOT_BOX,
    TALLY_SHEET_ROW_TYPE_NUMBER_OF_ORDINARY_BALLOTS_IN_BALLOT_PAPER_ACCOUNT,
    TALLY_SHEET_ROW_TYPE_NUMBER_OF_TENDERED_BALLOTS_IN_BALLOT_BOX,
    TALLY_SHEET_ROW_TYPE_NUMBER_OF_TENDERED_BALLOTS_IN_BALLOT_PAPER_ACCOUNT
} from "../constants/TALLY_SHEET_ROW_TYPE";
import {isNumeric, processNumericValue} from "../../../utils";
import {useTallySheetEdit} from "./index";
import Processing from "../../processing";

export default function TallySheetEdit_CE_201({history, queryString, election, tallySheet, messages}) {

    const [tallySheetRows, setTallySheetRows] = useState({
        [TALLY_SHEET_ROW_TYPE_BALLOT_BOX]: {
            templateRow: {}, map: {}
        },
        [TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_RECEIVED]: {
            templateRow: {}, map: {}
        },
        [TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_SPOILT]: {
            templateRow: {}, map: {}
        },
        [TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_ISSUED]: {
            templateRow: {}, map: {}
        },
        [TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_UNUSED]: {
            templateRow: {}, map: {}
        },
        [TALLY_SHEET_ROW_TYPE_NUMBER_OF_ORDINARY_BALLOTS_IN_BALLOT_PAPER_ACCOUNT]: {
            templateRow: {}, map: {}
        },
        [TALLY_SHEET_ROW_TYPE_NUMBER_OF_ORDINARY_BALLOTS_IN_BALLOT_BOX]: {
            templateRow: {}, map: {}
        },
        [TALLY_SHEET_ROW_TYPE_NUMBER_OF_TENDERED_BALLOTS_IN_BALLOT_PAPER_ACCOUNT]: {
            templateRow: {}, map: {}
        },
        [TALLY_SHEET_ROW_TYPE_NUMBER_OF_TENDERED_BALLOTS_IN_BALLOT_BOX]: {
            templateRow: {}, map: {}
        }
    });

    const {pollingStations} = tallySheet.area;


    const handleNumValueChange = (areaId, templateRowType) => event => {
        const {value} = event.target;
        setTallySheetRows((tallySheetRows) => {
            tallySheetRows = {...tallySheetRows};
            Object.assign(tallySheetRows[templateRowType].map[areaId], {numValue: processNumericValue(value)});

            return tallySheetRows;
        });
    };

    const getTallySheetRow = (areaId, templateRowType) => {
        if (tallySheetRows[templateRowType] && tallySheetRows[templateRowType].map && tallySheetRows[templateRowType].map[areaId]) {
            return tallySheetRows[templateRowType].map[areaId];
        }

        return null
    };

    const getNumValue = (areaId, templateRowType) => {
        const tallySheetRow = getTallySheetRow(areaId, templateRowType);
        if (tallySheetRow) {
            return tallySheetRow.numValue;
        }

        return 0;
    };


    const setTallySheetContent = (tallySheetVersion) => {
        const _tallySheetRows = {...tallySheetRows};

        // Get the `templateRow` assigned to each type of tally sheet rows.
        tallySheet.template.rows.map(((templateRow) => {
            if (_tallySheetRows[templateRow.templateRowType]) {
                Object.assign(_tallySheetRows[templateRow.templateRowType].templateRow, templateRow)
            }
        }));

        // Set default values to rows.
        pollingStations.map((pollingStation) => {
            const {areaId} = pollingStation;

            // Set up the three ballot boxes per each polling station.
            // TODO


            // Set up all the other rows equally per polling station.
            [
                TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_RECEIVED, TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_SPOILT,
                TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_ISSUED, TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_UNUSED,
                TALLY_SHEET_ROW_TYPE_NUMBER_OF_ORDINARY_BALLOTS_IN_BALLOT_PAPER_ACCOUNT,
                TALLY_SHEET_ROW_TYPE_NUMBER_OF_ORDINARY_BALLOTS_IN_BALLOT_BOX,
                TALLY_SHEET_ROW_TYPE_NUMBER_OF_TENDERED_BALLOTS_IN_BALLOT_PAPER_ACCOUNT,
                TALLY_SHEET_ROW_TYPE_NUMBER_OF_TENDERED_BALLOTS_IN_BALLOT_BOX
            ].map((templateRowType) => {
                // TODO validate _tallySheetRows
                const _templateRowDefault = {
                    ..._tallySheetRows[templateRowType].templateRow,
                    areaId: areaId, numValue: 0
                };
                _tallySheetRows[templateRowType].map[areaId] = _templateRowDefault;
            })
        });

        if (tallySheetVersion) {
            const {content} = tallySheetVersion;
            for (let i = 0; i < content.length; i++) {
                let contentRow = content[i];
                if (contentRow.templateRowType === TALLY_SHEET_ROW_TYPE_BALLOT_BOX) {
                    // TODO
                } else {
                    // TODO validate _tallySheetRows
                    Object.assign(_tallySheetRows[contentRow.templateRowType].map[contentRow.areaId], contentRow)
                }
            }
        }

        setTallySheetRows(_tallySheetRows);
    };

    const validateTallySheetContent = () => {
        // TODO

        return true
    };

    const getTallySheetRequestBody = () => {
        const content = [];
        [
            TALLY_SHEET_ROW_TYPE_BALLOT_BOX,
            TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_RECEIVED, TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_SPOILT,
            TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_ISSUED, TALLY_SHEET_ROW_TYPE_NUMBER_OF_BALLOTS_UNUSED,
            TALLY_SHEET_ROW_TYPE_NUMBER_OF_ORDINARY_BALLOTS_IN_BALLOT_PAPER_ACCOUNT,
            TALLY_SHEET_ROW_TYPE_NUMBER_OF_ORDINARY_BALLOTS_IN_BALLOT_BOX,
            TALLY_SHEET_ROW_TYPE_NUMBER_OF_TENDERED_BALLOTS_IN_BALLOT_PAPER_ACCOUNT,
            TALLY_SHEET_ROW_TYPE_NUMBER_OF_TENDERED_BALLOTS_IN_BALLOT_BOX
        ].map((templateRowType) => {
            pollingStations.map(pollingStation => {
                const {areaId} = pollingStation;
                const tallySheetRow = getTallySheetRow(areaId, templateRowType);
                if (tallySheetRow) {
                    content.push(tallySheetRow);
                }
            });
        });

        return {
            content: content
        }
    };

    const {processing, processingLabel, saved, handleClickNext, handleClickSubmit, handleClickBackToEdit} = useTallySheetEdit({
        messages,
        history,
        election,
        tallySheet,
        setTallySheetContent,
        validateTallySheetContent,
        getTallySheetRequestBody
    });


    function getTallySheetEditForm() {
        if (saved) {
            return <Table aria-label="simple table" size={saved ? "small" : "medium"}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Polling Districts</TableCell>
                        <TableCell align="left">Polling Station</TableCell>
                        <TableCell align="center">Ordinary Ballot Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pollingStations.map(pollingStation => {
                        const {pollingDistricts, areaName, areaId} = pollingStation;
                        const pollingDistrictsStr = pollingDistricts.map(pollingDistrict => pollingDistrict.areaName).join(", ");
                        return <TableRow key={areaId}>
                            <TableCell align="left">{pollingDistrictsStr}</TableCell>
                            <TableCell align="left">{areaName}</TableCell>
                            <TableCell align="center">
                                {getNumValue(areaId, TALLY_SHEET_ROW_TYPE_NUMBER_OF_ORDINARY_BALLOTS_IN_BALLOT_BOX)}
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>Total ordinary ballot count</TableCell>
                        <TableCell align="right">-- TODO --</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={3}>
                            <div className="page-bottom-fixed-action-bar">
                                <Button variant="contained" color="default" onClick={handleClickBackToEdit()}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleClickSubmit()}>
                                    Submit
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>

                </TableFooter>

            </Table>
        } else if (!processing) {
            return <Table aria-label="simple table" size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Polling Districts</TableCell>
                        <TableCell align="left">Polling Station</TableCell>
                        <TableCell align="center">Ordinary Ballot Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pollingStations.map(pollingStation => {

                        const {pollingDistricts, areaName, areaId} = pollingStation;
                        const pollingDistrictsStr = pollingDistricts.map(pollingDistrict => pollingDistrict.areaName).join(", ");
                        const numValue = getNumValue(areaId, TALLY_SHEET_ROW_TYPE_NUMBER_OF_ORDINARY_BALLOTS_IN_BALLOT_BOX);

                        return <TableRow key={areaId}>
                            <TableCell align="left">{pollingDistrictsStr}</TableCell>
                            <TableCell align="left">{areaName}</TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    variant="outlined"
                                    error={!isNumeric(numValue)}
                                    helperText={!isNumeric(numValue) ? "Only numeric values are valid" : ''}
                                    value={numValue}
                                    margin="normal"
                                    onChange={handleNumValueChange(areaId, TALLY_SHEET_ROW_TYPE_NUMBER_OF_ORDINARY_BALLOTS_IN_BALLOT_BOX)}
                                    inputProps={{
                                        style: {
                                            height: '10px'
                                        },
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell align="right" colSpan={2}>Total ordinary ballot count</TableCell>
                        <TableCell align="right">
                            {/*TODO*/}
                            {/*<TextField*/}
                            {/*    required*/}
                            {/*    error={calculateTotalOrdinaryBallotCountFromBoxCount() !== totalOrdinaryBallotCountFromBoxCount}*/}
                            {/*    helperText={calculateTotalOrdinaryBallotCountFromBoxCount() !== totalOrdinaryBallotCountFromBoxCount ? 'Total ballot count mismatch!' : ' '}*/}
                            {/*    value={totalOrdinaryBallotCountFromBoxCount}*/}
                            {/*    margin="normal"*/}
                            {/*    onChange={handleTotalOrdinaryBallotCountFromBoxCountChange()}*/}
                            {/*/>*/}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={3}>
                            <div className="page-bottom-fixed-action-bar">
                                <Button variant="contained" color="default" onClick={handleClickNext()}>
                                    Save & Next
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>

            </Table>
        } else {
            return null;
        }
    }

    return <Processing showProgress={processing} label={processingLabel}>
        {getTallySheetEditForm()}
    </Processing>;
}