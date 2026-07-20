import SerenaFooter from '../Footer'
import Header from '../Header'
import ClusterListing from './ClusterListing'

function Properties() {
  return (
    <div>
        <Header/>
        <p className=' text-6xl text-center  '> Every community <br/> have their unique</p>
        <p className='text-center '> Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br/> Quas porro aliquam praesentium ad perferendis? iure ex.</p>
        <ClusterListing/>
        <SerenaFooter/>
    </div>
  )
}

export default Properties