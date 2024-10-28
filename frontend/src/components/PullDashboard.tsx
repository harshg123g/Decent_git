"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";



const PullDashboard: React.FC = () => {

    function onFileChange(){}
    function handleUpload(){}
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10%", paddingRight: "10%", marginTop: "30px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "Center", gap: "20px" }}>
        <div style={{ width: "80%" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button style={{ width: "30px", height: "30px", borderRadius: "50%", background: "red" }}></button>
              <p>Repository Name</p>
              <Badge variant="outline">Private</Badge>
            </div>
            <div style={{ gap: "10px", display: "flex" }}>
             <Button onClick={()=>{
              location.href="pulls/create/"
             }}>Create Pull</Button>
            </div>
          </div>
          <div style={{ border: "1px solid grey", borderRadius: "5px" }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">User</TableHead>
                  <TableHead className="text-center"></TableHead>
                  <TableHead className="text-right">Time-Stamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell className='text-center'>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PullDashboard;