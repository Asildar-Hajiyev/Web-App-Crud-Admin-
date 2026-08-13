import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUser } from "../../redux/userSlice";

function Users() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  const [image,setImage] = useState('')
  const [name,setName] = useState('')
  const [surname,setSurname] = useState('')
  const [phone,setphone] = useState('')
  const [age,setAge] = useState('')

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const addHandle = (e)=>{
    e.preventDefault();
    dispatch(createUser({image,name,surname,phone,age}))
    setImage('')
    setName('')
    setSurname('')
    setphone('')
    setAge('')
  }

  if (loading) return <h2>yuklenir...</h2>;
  if (error) return <p>{error} : xeta</p>;
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">İstifadəçilər</h1>
      <form onSubmit={addHandle} className="flex flex-wrap gap-2 mb-4">
        <input value={image} onChange={(e)=>setImage(e.target.value)} placeholder="Şəkil URL" className="border p-2 rounded" />
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Ad" className="border p-2 rounded" />
        <input value={surname} onChange={(e)=>setSurname(e.target.value)} placeholder="Soyad" className="border p-2 rounded" />
        <input value={phone} onChange={(e)=>setphone(e.target.value)} placeholder="Telefon" className="border p-2 rounded" />
        <input value={age} onChange={(e)=>setAge(e.target.value)} placeholder="Yaş" className="border p-2 rounded w-20" />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">
          {" "}
          elave et
        </button>
      </form>
      <ul className="space-y-2">
        {data.map((item) => (
          <li
            key={item.id}
            className="border p-3 rounded flex items-center gap-3"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>
              {item.name} {item.surname} - {item.phone} - {item.age}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
