import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { setToken } from '@/store/slices/authSlice';

const CreateTender = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate
  const token = useSelector((state) => state.auth.token);

  const [newTender, setNewTender] = useState({
    title: '',
    deadline: '',
    description: '',
    documents: [],
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  const handleNewTenderChange = (field, value) => {
    setNewTender((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDocumentUpload = (event) => {
    const files = Array.from(event.target.files);
    setNewTender((prev) => ({
      ...prev,
      documents: [...prev.documents, ...files],
    }));
  };

  const handleCreateTender = async (e) => {
    e.preventDefault();

    if (!token) {  // Check if the user is not logged in
      alert('You are not logged in. Please log in to create a tender.');
      navigate('/login');  // Redirect to the login page
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/tenders',
        {
          title: newTender.title,
          deadline: newTender.deadline,
          description: newTender.description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const tenderId = response.data.id;

      const uploadPromises = newTender.documents.map((document) => {
        const formData = new FormData();
        formData.append('document', document);

        return axios.post(
          `http://localhost:3000/api/tenders/${tenderId}/documents`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });

      await Promise.all(uploadPromises);

      setNewTender({
        title: '',
        deadline: '',
        description: '',
        documents: [],
      });

      alert('Tender created successfully with documents!');
      navigate('/');
    } catch (error) {
      console.error('Error creating tender:', error);
      alert('Error creating tender. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-wrap w-full max-w-4xl bg-card rounded-lg shadow-sm">
        <section className="w-full md:w-1/2 p-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Create New Tender</h2>
            <p className="text-muted-foreground">Submit your tender details</p>
          </div>
          <form className="space-y-6" onSubmit={handleCreateTender}>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newTender.title}
                onChange={(e) => handleNewTenderChange('title', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newTender.description}
                onChange={(e) => handleNewTenderChange('description', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={newTender.deadline}
                onChange={(e) => handleNewTenderChange('deadline', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="documents">Documents</Label>
              <div className="flex flex-col gap-2">
                <Input
                  id="documents"
                  type="file"
                  multiple
                  onChange={handleDocumentUpload}
                />
                {newTender.documents.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newTender.documents.map((doc, index) => (
                      <div key={index} className="bg-muted rounded-md px-2 py-1 text-sm">
                        {doc.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <Button
              type="submit"
              variant="solid"
              className="w-full bg-orange-400 hover:bg-orange-500"
            >
              Create Tender
            </Button>
          </form>
        </section>
        <section className="w-full md:w-1/2">
          <img src="/create-tender.png" alt="Create Tender" className="w-full h-full object-cover rounded-r-lg" />
        </section>
      </div>
    </div>
  );
};

export default CreateTender;
