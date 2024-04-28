import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const SubscribeUser = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        message: ''
    });
    const [response, setResponse] = useState('');

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://kzs71owd56.execute-api.us-east-1.amazonaws.com/dev/static-mailer', formData);
            setResponse(response.data.message);
        } catch (error) {
            setResponse('An error occurred while submitting the form.');
            console.error(error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Subscribe
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                />
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
            {response && (
                <Typography variant="body1" style={{ marginTop: '20px' }}>
                    {response}
                </Typography>
            )}
        </Container>
    );
};

export default SubscribeUser;
