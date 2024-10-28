import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

function Page() {

    return (
        <div style={{ display: "flex", flexDirection: "column", padding: "20%" }}>
            <input
                placeholder='Only Zip'
                type='file'
                style={{ border: '1px solid grey' }}
            />
            <input
                placeholder='REPO ID'
                type='text'
                style={{ marginBottom: "10px", padding: "10px", border: "1px solid grey" }}
            />
            <input
                placeholder='Description'
                type='text'
                style={{ marginBottom: "10px", padding: "10px", border: "1px solid grey" }}
            />
            <Button style={{ width: "80px" }}>Create</Button>
        </div>
    );
}

export default Page;