import React, { useState } from 'react';
import { Modal, Button, Box } from '@mui/material';

const ModalPopupEdit = ({ isOpen, onClose }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postTitle && postContent) {
      try {
        let response = await fetch("http://localhost:3000/api/addPosts", {
          method: "POST",
          body: JSON.stringify({
            title: postTitle,
            content: postContent,
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        });

        // Wait for the JSON response
        let data = await response.json();

        // Check the status of the response
        if (response.ok) {
          setPostTitle("");
          setPostContent("");
          setError("");
          setMessage("Post added successfully!");
        } else {
          // Server-side error
          setError(data.error || "An error occurred while adding the post.");
        }
      } catch (errorMessage) {
        // Network error
        setError(errorMessage.message || "An error occurred while adding the post.");
      }
    } else {
      setError("All fields are required!");
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="flex justify-center items-center flex-col p-5">
        <input
          type="text"
          placeholder="Title of the post"
          name="title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <textarea
          className="block w-full p-2 mt-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          cols="20"
          rows="8"
          placeholder="Content of the post"
          name="content"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>

        <button
          type="submit"
          onClick={handleSubmit}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3"
        >
          Add post
        </button>

        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
      </div>
    </Modal>
  );
};

export default ModalPopupEdit;
