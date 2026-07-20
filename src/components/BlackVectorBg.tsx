import backgroundimg from '../assets/Vector (1).png'
import Button from './Button'
function BlackVectorBg() {
    return (
        <div style={{
            backgroundColor: 'black', color: 'white', padding: '20px'
        }}>
           <div className="flex flex-col sm:flex-row gap-8 p-5">
  {/* Left Div (Title) - Takes up equal space on desktop */}
  <div className="flex-1">
    <h1 className="font-bold text-4xl leading-tight">
      Shaping the <br className="hidden sm:block" /> timeless of the <br /> living spaces
    </h1>
  </div>

  {/* Right Div (Paragraph + Buttons) - Takes up equal space on desktop */}
  <div className="flex-1 flex flex-col justify-between">
    <p className="text-white-600 leading-relaxed">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
      voluptate earum fugit, inventore quod asperiores, voluptatem at quidem
      velit reprehenderit optio odio nihil consequatur esse eveniet sit
      provident ut. Harum temporibus veritatis exercitationem saepe ducimus
      officia dolore, quaerat assumenda voluptas corporis? Nemo quas aut,
      voluptatum cum commodi nisi sapiente vel.
    </p>
    
    {/* Buttons Container - Stacks on mobile, inline on desktop */}
    <div className="mt-6 flex flex-col sm:flex-row gap-3">
      <Button className="bg-white p-3 text-black border border-slate-200 w-full sm:w-auto">
        View our vision
      </Button>
      <Button className="bg-gray-500 p-3 text-white w-full sm:w-auto">
        Explore our community
      </Button>
    </div>
  </div>
</div>

            <img src={backgroundimg} alt="My Vector" style={{ width: '100%', height: '700px' }} />
        </div>
    )
}

export default BlackVectorBg