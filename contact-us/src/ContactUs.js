import { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import axios from 'axios';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        to: '',
        from: '',
        subject: '',
        message: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://gry20rwo20.execute-api.us-east-1.amazonaws.com/dev/contact-us', formData);
            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setOpenSnackbar(true);
        } catch (error) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to send email');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>Contact Us</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="To"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="From"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Send Email
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </Container>
    );
};

export default ContactUs;
