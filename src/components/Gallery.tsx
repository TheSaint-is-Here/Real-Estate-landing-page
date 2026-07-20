import pic1 from '../assets/Rectangle 109.png'
import pic2 from '../assets/Rectangle 109 (1).png'
import pic3 from '../assets/Rectangle 109 (2).png'
import pic4 from '../assets/Rectangle 109 (3).png'
import pic5 from '../assets/Rectangle 109 (4).png'
import pic6 from '../assets/Rectangle 109 (5).png'
import pic7 from '../assets/Rectangle 109 (6).png'
import pic8 from '../assets/Rectangle 109 (7).png'
import pic9 from '../assets/Rectangle 109 (8).png'
import Button from './Button'
import { MoveUpRight } from 'lucide-react';






function Gallery() {
    const gallery = [
        { title: "Bathroom", photo: pic1 },
        { title: "Kitchen & Dinning", photo: pic2 },
        { title: "Family room", photo: pic3 },
        { title: "RoofTOP", photo: pic4 },
        { title: "Bedroom", photo: pic5 },
        { title: "Living room", photo: pic6 },
        { title: "Bathroom", photo: pic7 },
        { title: "Kitchen & Dinning", photo: pic8 },
        { title: "Family room", photo: pic9 },
    ];

    return (
        <div className="bg-black text-white sm:p-5  ">
            <div className="grid grid-cols-1 sm:p-25 gap-1.5 bg-black text-white sm:grid sm:grid-cols-3 sm:gap-2">
                {gallery.map((item, idx) => (
                    <div
                        key={idx}
                        className=" mb-4 mt-4 p-5 flex rounded-2xl bg-black text-white"
                    >
                        <div className='bg-gray-500 p-5'>
                            <p className="font-bold text-center mt-5 mb-5">{item.title}</p>
                            <img src={item.photo} alt={item.title} />
                            
                        </div>
                      
                    </div>
                    
                ))}
            </div>
             <p className='text-center'>  Lorem, ipsum dolor sit amet<br/> consectetur adipisicing elit. Dolor quos re<br/>iciendis consequatur ipsam de<br/>leniti, debitis odit cupiditate ame<br/>t quae officiis? 
             </p>
             <Button className="bg-gray-500 text-black p-2   mx-auto flex  ">View More <MoveUpRight/> </Button>
        </div>
    );
}

export default Gallery;