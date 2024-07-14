import { createHashRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home.jsx"
import Layout from "./components/Layout.jsx"
import NotFound from "./components/NotFound.jsx"


function App() {

const router = createHashRouter([
  {path:'/',element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:'home',element:<Home/>},
   {path:'*',element:<NotFound/>}
  ]}
])



  return <RouterProvider router={router} ></RouterProvider>
}

export default App
