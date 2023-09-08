import React, { useState } from 'react';
import { Typography, Paper, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ULA = () => {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>
                </Typography>

                <Accordion expanded={expanded} onChange={handleExpandClick}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="body2">
                            User License Agreement (ULA) for FSM
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <Typography variant="body2" style={{color: 'darkred'}}>
                           <strong> In a nutshell, the below says that FSM is in test mode. Do not use real data at this time.</strong>
                        </Typography><br/>

                        <Typography variant="body2">
                            This <strong>User License Agreement ("ULA")</strong> is a legal agreement between you (hereinafter referred to as "<strong>User</strong>") and FSM (Flight School Management Application), owned and developed by ADMCAN (hereinafter referred to as "<strong>ADMCAN</strong>"). By using FSM, you agree to abide by the following terms and conditions:
                        </Typography>
                        <ul>
                            <li>
                                <Typography variant="body2">
                                    <strong>FSM is a Flight School Management Application:</strong> FSM is a software application designed for flight school management purposes.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    <strong>FSM Use is for Demo Purposes Only:</strong> FSM is intended for demonstration purposes only. It is not intended for full-scale usage and does not guarantee complete functionality.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    <strong>FSM is Not in Production:</strong> FSM is currently in the development and testing phase and is not in production. It may contain bugs, errors, or incomplete features.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    <strong>Use of FSM is for Testing and Exploration Only:</strong> Any use of FSM is strictly for testing, evaluation, and exploration purposes. It should not be used for production or operational purposes.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    <strong>Do Not Enter Real Data:</strong> Users are expressly prohibited from entering real or sensitive data into FSM. It is essential to refrain from inputting any information that is confidential or proprietary.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    <strong>No Liability for User Data:</strong> ADMCAN and FSM shall not be held responsible or liable for any user-entered data. Users are solely responsible for the information they input into FSM.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    <strong>No Liability for Damages:</strong> ADMCAN and FSM shall not be liable for any damages, losses, or consequences arising from the use of FSM, including but not limited to data loss, system errors, or any other issues.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    <strong>Do Not Use Real Names, content and passwords:</strong> Users must not use real or sensitive information when accessing FSM. It is imperative to choose passwords that are not used for other critical accounts or services.
                                </Typography>
                            </li>
                        </ul>
                        <Typography variant="body2">
                            By using FSM, you acknowledge that you have read, understood, and agree to the terms and conditions outlined in this ULA. If you do not agree with any of these terms, you should refrain from using FSM. This ULA may be subject to updates and changes, and it is the responsibility of the User to review the latest version.
                        </Typography>
                    </AccordionDetails>
                </Accordion>



            </Paper>
        </Container>
    );
};

export default ULA;
