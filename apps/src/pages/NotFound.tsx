import { Link } from "react-router-dom";

export default function NotFound(){
    return (
      
    <section className="h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow p-2 rounded-2xl text-center py-10 "> 
            <div className="flex flex-col space-y-2 items-center">
                <h1 className="text-3xl font-bold">PAGE NOTE FOUND</h1>
                <Link to="/" > Back </Link>
            </div>
        </div>
    </section>
     
    )
}