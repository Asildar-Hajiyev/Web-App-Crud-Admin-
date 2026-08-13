import { useSelector } from "react-redux"

function Users() {
  const {data,loading,error} = useSelector(state=>state.users)
  return (
    <div>
      Users
      <button>create+</button>
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>Name</td>
            <td>email</td>
            <td>action</td>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  )
}

export default Users
