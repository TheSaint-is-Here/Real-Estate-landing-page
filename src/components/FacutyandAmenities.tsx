import ExclusiveFacilities from './ExclusiveFacilities'
import SerenaFooter from './Footer'
import GeneralFacilities from './GneralFacilities'
import Header from './Header'
import FacilitiesGallery from './FacilitiesGallery'

function FacutyandAmenities() {
  return (
    <div>
      <Header/>
      <FacilitiesGallery/>
      <GeneralFacilities/>
        <ExclusiveFacilities/>
        <SerenaFooter/>

    </div>
  )
}

export default FacutyandAmenities