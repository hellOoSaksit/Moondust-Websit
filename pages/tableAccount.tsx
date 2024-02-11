import { useMemo } from 'react';

import { useState } from 'react';
import { Button, Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { MRT_Row, MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
// import ModalPopup  from '../components/ModalPopupEdit';
type Props = {
  posts : [Post]
}

type Post = {
  _id : String;
  email : String;
  password : String;
  role : String;
  username : String;
  name: String;
}



export async function getServerSideProps() {
  try {
    let response = await fetch("http://localhost:3000/api/getAccount");
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
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 200,
      },
      {
        accessorKey: 'username',
        header: 'Username(ID)',
        size: 200,
      },
      {
        accessorKey: 'password',
        header: 'Password',
        size: 200,
      },
      {
        accessorKey: 'role',
        header: 'Role',
        size: 200,
      },
    ],
    [],
  );

  const handleEdit = (row: MRT_Row<Post>) => {
    // console.info('Edit' , row.original._id);
    window.location.href = `/postsAccount/${row.original._id}`;
  };
  const handleDelete = async (row: MRT_Row<Post>) => {
    console.info('Delete' , row.original._id);
    try {
      let response = await fetch("http://localhost:3000/api/deleteAccount?id=" + row.original._id , {
        method : "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })

      response = await response.json();
      window.location.reload();
    } catch (error) {
      console.log("An error occured while deleting" , error);
    }
  };


  const table = useMaterialReactTable(
  {
    columns,
    data: posts,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box>
        <IconButton onClick= {() => handleEdit(row)}>  
        <EditIcon />
        </IconButton>
        <IconButton onClick= {() => handleDelete(row)}>  
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
    // renderTopToolbarCustomActions: ({ table }) => (
    //   <button
    //     data-modal-target="crud-modal"
    //     data-modal-toggle="crud-modal"
    //     onClick=""
    //     className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //     type="button"
    //   >
    //     Toggle modal
    //   </button>
    // ),
  
  });
  

  return (
    <>
      <MaterialReactTable table={table} />
    
    </>
  );
};

export default Table;