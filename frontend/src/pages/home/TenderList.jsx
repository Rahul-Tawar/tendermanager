import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import { FilterIcon, CalendarIcon } from '@/components/iconComponents/Icons';

// Function to format date in DD/MM/YY format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
};

// Function to determine status based on deadline
const getStatus = (deadline) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  return deadlineDate >= now ? 'open' : 'closed';
};

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    status: "all",
    deadline: "all",
  });

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tenders');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTenders(data);
      } catch (error) {
        console.log("Error while requesting the server:", error);
        setError("Failed to fetch tenders");
      }
    };

    fetchTenders();
  }, []);

  useEffect(() => {
    console.log(tenders);
  }, [tenders]);

  const handleTenderClick = (tender) => {
    navigate(`/tender/${tender.id}`);
  };

  const filterTenders = (tenders) => {
    return tenders.filter((tender) => {
      const status = getStatus(tender.deadline);
      const now = new Date();
      const deadlineDate = new Date(tender.deadline);

      const statusMatch = filters.status === "all" || status === filters.status;
      const deadlineMatch =
        filters.deadline === "all" ||
        (filters.deadline === "upcoming" && deadlineDate >= now) ||
        (filters.deadline === "past" && deadlineDate < now);

      return statusMatch && deadlineMatch;
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredTenders = filterTenders(tenders);

  return (
    <div className='flex flex-wrap gap-4 flex-row mx-auto'>
      <div className="flex flex-col gap-3 w-full p-10">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Tenders</h2>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <FilterIcon className="w-4 h-4 mr-2" />
                  <span>
                    {filters.status === "all" ? "Status" : filters.status === "open" ? "Open" : "Closed"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                  value={filters.status}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                >
                  <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="open">Open</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="closed">Closed</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>
                    {filters.deadline === "all"
                      ? "Deadline"
                      : filters.deadline === "upcoming"
                      ? "Upcoming"
                      : "Past"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                  value={filters.deadline}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, deadline: value }))}
                >
                  <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="upcoming">Upcoming</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="past">Past</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {filteredTenders.length > 0 ? (
        filteredTenders.map((tender) => {
          const formattedDeadline = formatDate(tender.deadline);
          const status = getStatus(tender.deadline);

          return (
            <div className='pl-7'>
              <Card key={tender.id} className="h-48 w-96 max-w-sm">
              <CardHeader>
                <CardTitle>{tender.title}</CardTitle>
                <CardDescription>
                  {status === "open" ? (
                    <Badge variant="secondary">Open</Badge>
                  ) : (
                    <Badge variant="outline">Closed</Badge>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Deadline: {formattedDeadline}</p>
                  <p className="font-semibold">₹{tender.amount}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={() => handleTenderClick(tender)} className="bg-orange-400 hover:bg-orange-500">
                  View Tender
                </Button>
              </CardFooter>
            </Card>
            </div>
          );
        })
      ) : (
        <p>No tenders match the selected filters.</p>
      )}
    </div>
  );
};

export default TenderList;
