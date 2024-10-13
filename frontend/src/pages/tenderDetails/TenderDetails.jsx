import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { MenuIcon, CalendarIcon, BriefcaseIcon } from "@/components/iconComponents/Icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "@/store/slices/authSlice";

export default function TenderDetails() {
  const [filters, setFilters] = useState({
    status: "all",
    deadline: "all",
  });
  const { tenderId } = useParams();

  const Navigate = useNavigate();
  
  const [selectedTender, setSelectedTender] = useState(null);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState([]);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);
  
  // Fetching the tender by ID
  useEffect(() => {
    const fetchTender = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/tenders/${tenderId}`);
        const data = await response.data;
        setSelectedTender(data);
      } catch (error) {
        setError("Failed to fetch tender");
      }
    };

    fetchTender();
  }, [tenderId]);

  // Fetching bids for the tender
  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/bids/${tenderId}`);
        const data = await response.data;
        setBids(data);
      } catch (error) {
        console.error("Failed to fetch bids", error);
      }
    };

    fetchBids();
  }, [tenderId]);

  //fetching the tender Document

  useEffect(() => {
     
    const fetchDocuments = async () => {
      console.log("fetching documents");
      
      try {
        console.log(token);
        const response = await axios.get(`http://localhost:3000/api/tenders/${tenderId}/documents`
        , {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token for authentication
          },
        }
        );
        const data = await response.data;
        setSelectedTender((prevTender) => ({ ...prevTender, documents: data }));  
      } catch (error) {
        console.error("Failed to fetch documents", error);
      }
    };
    fetchDocuments();
  }, [tenderId]);
  
  // Handle bid submission
  const handleBidSubmit = async () => {

    if(!token) {
      Navigate("/login");
    }

    if (selectedTender) {
      try {
        const response = await axios.post("http://localhost:3000/api/bids", {
          amount: bidAmount,
          tenderId: tenderId,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token for authentication
          },
        });
        const newBid = response.data;
        setBids([...bids, newBid]);
        setBidAmount(""); // Clear the input
      } catch (error) {
        console.error("Failed to submit bid", error);
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedTender) {
    return <div>Loading...</div>;
  }

  const {
    title = "",
    description = "",
    deadline = "",
    requirements = [],
    documents = [],
    contact = {},
    status = "open",
    amount = 0
  } = selectedTender;

  const { name = "", email = "", phone = "" } = contact;

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <section className="bg-background py-16 px-6 md:px-12">
          <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
              <p className="text-muted-foreground md:text-xl">{description}</p>
              <Separator className="my-6" />
              <h2 className="text-2xl font-bold">Requirements</h2>
              <ul className="list-disc pl-6 space-y-2">
                {requirements.length > 0 ? (
                  requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))
                ) : (
                  <li>No requirements listed</li>
                )}
              </ul>
              <Separator className="my-6" />
              <h2 className="text-2xl font-bold">Documents</h2>
              <div className="space-y-2">
                {documents.length > 0 ? (
                  documents.map((document, index) => (
                    <div key={index}>
                      <a href="#" className="text-blue-600 underline">
                        {document.name || "Unnamed Document"}
                      </a>
                    </div>
                  ))
                ) : (
                  <p>No documents available</p>
                )}
              </div>
              <Separator className="my-6" />
              <h2 className="text-2xl font-bold">Contact</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span> {name || "Not Provided"}
                </p>
                <p>
                  <span className="font-medium">Email:</span> <a href={`mailto:${email || ""}`}>{email || "Not Provided"}</a>
                </p>
                <p>
                  <span className="font-medium">Phone:</span> <a href={`tel:${phone || ""}`}>{phone || "Not Provided"}</a>
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Tender Details</h2>
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Status</p>
                  {status === "open" ? (
                    <Badge variant="secondary">Open</Badge>
                  ) : (
                    <Badge variant="outline">Closed</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Deadline</p>
                  <p>{new Date(deadline).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-semibold">₹{amount}</p>
                </div>
              </div>
              <Separator className="my-6" />
              {status === "open" ? (
                <div className="grid gap-4">
                  <Input
                    type="number"
                    placeholder="Enter your bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                  <Button className="bg-orange-400 hover:bg-orange-500" onClick={handleBidSubmit}>
                    Submit Bid
                  </Button>
                </div>
              ) : (
                <Button className="w-full" disabled>
                  Tender Closed
                </Button>
              )}
              <Separator className="my-6" />
              <div>
                <h2 className="text-2xl font-bold">Other Bids</h2>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  {bids.length > 0 ? (
                    bids.map((bid) => (
                      <li key={bid.id}>₹{bid.amount} by User {bid.userId}</li>
                    ))
                  ) : (
                    <li>No bids yet</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
