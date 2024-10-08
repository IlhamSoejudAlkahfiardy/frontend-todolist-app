import { useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

import './App.css'
import Logo from './assets/images/icons/logo.png'

import Label from './components/Label';
import AddToDo from './components/AddToDo';
import SaveButton from './components/SaveButton';
import ToDoList from './components/ToDoList';
import CheckMyTodos from './components/CheckMyTodos';
import ListTodos from './components/ListTodos';

function App() {
  const [userTasks, setUserTasks] = useState([]);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [todos, setTodos] = useState([
    { description: '', category_id: '1' },
    { description: '', category_id: '1' },
    { description: '', category_id: '1' },
  ]);

  const csrfToken = Cookies.get('XSRF-TOKEN');

  const addToDo = () => {
    setTodos([...todos, { description: '', category_id: '1' }]);
  };

  const removeToDo = (index) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "To do yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!"
    }).then((result) => {
      if (result.isConfirmed) {
        const values = [...todos];
        values.splice(index, 1);
        setTodos(values);

        Swal.fire({
          title: "Berhasil!",
          text: "To do berhasil dihapus.",
          icon: "success"
        });
      }
    });


  };

  const handleInputChange = (index, event) => {
    const values = [...todos];
    if (event.target.name === "description") {
      values[index].description = event.target.value;
    } else if (event.target.name === "category_id") {
      values[index].category_id = event.target.value;
    }
    setTodos(values);
  };

  const isEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async () => {

    if (!name) {
      Swal.fire({
        title: "",
        text: "Nama tidak boleh kosong!",
        icon: "warning"
      });
      return;
    }

    if (!username) {
      Swal.fire({
        title: "",
        text: "Username tidak boleh kosong!",
        icon: "warning"
      });
      return;
    }

    if (!isEmail(email)) {
      Swal.fire({
        title: "",
        text: "Email tidak valid!",
        icon: "warning"
      });
      return;
    }

    try {

      // cek user apakah unique atau tidak
      await axios.post('http://localhost:8000/api/checkUser', {
        name,
        username,
        email
      }, {
        headers: {
          'X-XSRF-TOKEN': csrfToken,
        }
      })
        .then(async (response) => {
          for (let i = 0; i < todos.length; i++) {

            // jika response baik, lanjutkan request input task
            await axios.post('http://localhost:8000/api/create', {
              user_id: response.data.user_id,
              description: todos[i].description,
              category_id: todos[i].category_id,
            })
              .then((response) => {
                console.log(response);
              })

              .catch((error) => {
                console.log(error);
              })
          }
        })
        .catch((error) => {
          console.log(error);
        });


      Swal.fire({
        title: "Berhasil",
        text: "To do berhasil ditambahkan!",
        icon: "success"
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: "To do gagal ditambahkan!",
        icon: "error"
      });
      console.error('To Do List gagal ditambahkan', error);
    }
  };

  const handleCheckMyTodos = async () => {

    try {
      console.log(name, username, email);

      await axios.get('http://localhost:8000/api/getMyTodos', {
        params: {
          name: name,
          username: username,
          email: email
        },
      }, {
        headers: {
          'X-XSRF-TOKEN': csrfToken,
        }
      })
        .then((response) => {
          console.log(response.data.dataTasks);
          setUserTasks(response.data.dataTasks);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error('To Do List gagal ditemukan', error);
    }
  }

  const handleDeleteTodo = async (index) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "To do yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!"
    }).then(async (result) => {

      if (result.isConfirmed) {
        try {
          await axios.delete('http://localhost:8000/api/deleteTodo', {
            params: {
              task_id: userTasks[index].id
            },
            headers: {
              'X-XSRF-TOKEN': csrfToken,
            }
          })
            .then((response) => {
              console.log(response);
              const values = [...userTasks];
              values.splice(index, 1);
              setUserTasks(values);

              Swal.fire({
                title: "Berhasil!",
                text: "To do berhasil dihapus.",
                icon: "success"
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.error('To Do List gagal dihapus', error);
        }
      }
    })
  }

  return (
    <div className='w-screen min-h-screen flex justify-center py-24 bg-stone-100'>
      <div className="container h-full w-full m-auto">
        <div className='w-3/4 flex flex-col gap-10 justify-center items-center m-auto h-full'>

          {/* Logo Energeek */}
          <div className='w-full flex justify-center'>
            <img src={Logo} alt="" className='w-52' />
          </div>

          {/* Input Data User */}
          <div className='w-full p-10 bg-white grid grid-cols-3 gap-10 rounded-lg'>

            <div className='flex flex-col gap-2'>
              <Label text="Nama" />
              <input
                type="text"
                className='border border-slate-300 px-3 py-2 rounded-md'
                placeholder='Nama'
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label text="Username" />
              <input
                type="text"
                className='border border-slate-300 px-3 py-2 rounded-md'
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label text="Email" />
              <input
                type="email"
                className='border border-slate-300 px-3 py-2 rounded-md'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

          </div>

          <div className='w-full flex justify-between items-center'>
            <p className='text-zinc-900 text-2xl font-medium'>To Do List</p>
            <AddToDo addToDo={addToDo} />
          </div>

          {/* Input todo list */}
          <div className='w-full flex flex-col gap-5 px-3'>

            {todos.map((todo, index) => (
              <ToDoList
                todo={todo}
                index={index}
                key={index}
                handleInputChange={handleInputChange}
                removeToDo={removeToDo}
              />
            ))}

          </div>

          {/* Tombol Simpan */}
          <div className='w-full flex flex-col gap-2'>
            <SaveButton handleSubmit={handleSubmit} />
            <CheckMyTodos
              handleCheckMyTodos={handleCheckMyTodos}
            />
          </div>

          {userTasks.length > 0 && (
            <>
              <div className='w-full flex justify-between items-center'>
                <p className='text-zinc-900 text-2xl font-medium'>My To Do List</p>
              </div>

              <div className='w-full flex flex-col gap-5 px-3'>
                {userTasks.map((task, index) => (
                  <ListTodos data={task} index={index} handleDeleteTodo={handleDeleteTodo} />
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default App
