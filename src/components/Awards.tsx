import logo1 from '../assets/Logo Container (1).png'
import logo2 from '../assets/Logo Container (2).png'
import logo3 from '../assets/Logo Container (3).png'
import logo4 from '../assets/Logo Container (4).png'
import logo5 from '../assets/Logo Container (5).png'
import logo6 from '../assets/Logo Container.png'

function Awards() {
    return (
        <div className=' sm:flex  sm:flex-row flex flex-col'>
            <div className='sm:mt-90 sm:p-5 sm:m-20 m-5'>
                <p className='font-bold text-4xl  mb-10'> Our global awards & <br/> recognitions</p>
                <p className='text-left mb-5'> Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>Id error ipsam possimus quae tempora facilis <br/>rem voluptas vitae unde inventore. Lorem ipsum dolor, sit amet consectetur adipisicing elit.<br/>  Quaerat nam nemo veniam optio quia quidem dolores maiores.<br/> Eos, unde dolores!
                </p>
                <p className='font-bold mb-4'> More than 20 years we are known as </p>
                <ul>
                    <li> 🌴 we are the best </li>
                    <li> 🌴 we are the best </li>
                    <li> 🌴 we are the best </li>
                </ul>
            </div>
            <div className='grid grid-cols-2 mx-auto'>
                <img src={logo1} alt="logo" />
                <img src={logo2} alt="logo" />
                <img src={logo3} alt="logo" />
                <img src={logo4} alt="logo" />
                <img src={logo5} alt="logo" />
                <img src={logo6} alt="logo" />
            </div>
       </div>
    )
}

export default Awards