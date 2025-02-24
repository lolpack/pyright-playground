/*
 * Copyright (c) Eric Traut
 * Defines endpoint routes supported by this app server.
 */

import cors, { CorsOptions } from 'cors';
import express from 'express';
import {
    getDiagnostics,
    createSession,
    closeSession,
    getHoverInfo,
    getStatus,
    getSignatureHelp,
    getCompletion,
    resolveCompletion,
    getRenameEdits,
} from './service';

const router = express.Router();
export default router;

// Configure CORS middleware.
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        // Allow localhost during development.
        if (!origin || origin.match(/http:\/\/localhost\:*/)) {
            return callback(null, true);
        }

        // Allow requests from the same origin as the deployed app.
        const allowedHosts = [process.env.HOST_URL || ''];
        if (allowedHosts.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
};

router.use(cors(corsOptions));


router.get('/status', (req, res) => {
    getStatus(req, res);
});

router.post('/session', (req, res) => {
    createSession(req, res);
});

router.delete('/session/:sid', (req, res) => {
    closeSession(req, res);
});

router.post('/session/:sid/diagnostics', (req, res) => {
    getDiagnostics(req, res);
});

router.post('/session/:sid/hover', (req, res) => {
    getHoverInfo(req, res);
});

router.post('/session/:sid/rename', (req, res) => {
    getRenameEdits(req, res);
});

router.post('/session/:sid/signature', (req, res) => {
    getSignatureHelp(req, res);
});

router.post('/session/:sid/completion', (req, res) => {
    getCompletion(req, res);
});

router.post('/session/:sid/completionresolve', (req, res) => {
    resolveCompletion(req, res);
});
