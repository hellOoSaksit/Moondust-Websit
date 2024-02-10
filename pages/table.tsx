import { useMemo } from 'react';
import clientPromise from "../lib/mongodb";
import { useState } from 'react';
import { Button, Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
// import ModalPopup  from '../components/ModalPopupEdit';
type Props = {
  posts : [Post]
}

type Post = {
  _id : String;
  title : String;
  content : String;
}



export async function getServerSideProps() {
  try {
    let response = await fetch("http://localhost:3000/api/getPosts");
    let posts = await response.json();

    return {
      props: { posts: JSON.parse(JSON.stringify(posts)) }
    };

  } catch(e) {
    console.error(e);
    return { props: { posts: [] } };
  }
}

const Table: React.FC<Props> = (props: Props) => {
  const [posts, setPosts] = useState<Post[]>(props.posts);
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  const columns = useMemo<MRT_ColumnDef<Post>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'content',
        header: 'Content',
        size: 200,
      },
    ],
    [],
  );

  const handleEdit = () => {
    console.info('Edit');
    toggleModal(); // Optionally close the modal after handling the edit action
  };

  const handleDelete = () => {
    console.info('Delete');
  };


  const table = useMaterialReactTable(
  {
    columns,
    data: posts,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box>
        <IconButton onClick={handleEdit}>
           
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => console.info('Delete')}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <button
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        onClick=""
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button>
    ),
  
  });
  

  return (
    <>
      <MaterialReactTable table={table} />
    
    </>
  );
};

export default Table;