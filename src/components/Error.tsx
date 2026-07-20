import Header from './Header'
import error from '../assets/Image (19).png'
import error1 from '../assets/Image (20).png'
import error2 from '../assets/Image (21).png'
import { Link } from 'react-router-dom'

function Error() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            {/* Fluid wrapper that handles shrinking margins smoothly */}
            <div className="flex-1 flex items-center justify-center p-2 sm:p-6 md:p-12 lg:p-20">
                {/* 
                  - flex-row: Forces images onto the same row at all screen sizes
                  - w-full max-w-6xl: Grows fluidly with the screen up to a max width
                */}
                <div className="flex flex-row items-center justify-center gap-1 sm:gap-4 w-full max-w-6xl mx-auto">
                    {/* 
                      - w-1/3: Each image takes exactly 33.33% of the container width
                      - h-auto object-cover: Preserves correct proportional scale
                    */}
                    <img src={error} alt="Error segment left" className="w-1/3 h-auto object-cover rounded-sm sm:rounded-xl shadow-sm" />
                    <img src={error1} alt="Error segment center" className="w-1/3 h-auto object-cover rounded-sm sm:rounded-xl shadow-sm" />
                    <img src={error2} alt="Error segment right" className="w-1/3 h-auto object-cover rounded-sm sm:rounded-xl shadow-sm" />
                </div>
            </div>
            <div className='flex  flex-1 justify-between'>
                <p className=' font-bold sm:text-5xl flex-1 '> Oops, it seems <br /> you've gotten lost.</p>
                <div className='flex-1'> <p> The page you are looking for is not available or has been moved. Don't worry, let's go back to the previous page.</p>
                    <Link to='/'> <button className='bg-gray-500 p-2 '> back to previous </button> </Link></div> </div>
        </div>
    )
}

export default Error