"use client"
import { useState } from "react";

const [error, setError] = useState<string>("");

export const handleError = (err: any) => {
    if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
    } else if (err.message) {
        setError("Network error: " + err.message);
    } else {
        setError("An unexpected error occurred.");
    }
    return error
};
