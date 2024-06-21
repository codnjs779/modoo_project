import {createBrowserRouter} from 'react-router-dom'
import DetailPage from './components/DetailPage/DetailPage'
import App from './App'
import ItemList from './components/ItemList/ItemList'
import Contact from './components/Contact/Contact'
import BookmarkPage from './components/BookmarkPage/Bookmark'

export const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        errorElement: <div>not found</div>,
        children: [
            {
                index:true,
                element:<ItemList/>
            },
            {
                path:"jobid/:id",
                element:<DetailPage/>,
            },
            {
                path:"contact",
                element:<Contact/>,
            },
            {
                path:"bookmark",
                element:<BookmarkPage/>,// 북마크 컴포넌트로 변경 
            },
            {
                path:"login",
                // element:<ItemDetailPage/>, // 로그인 페이지로 변경
            },

        ]

    }
])
