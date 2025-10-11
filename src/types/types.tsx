export interface ButtonProps {
    className?: string;
    name: string;
    handleClick?: () => void;
    disabled?: boolean;
}

export interface Location {
  name: string;
}

export interface FarmerProfileInfo{
    crops: [];
    is_deleted:  boolean;
    _id: string;
    customer_name : string; 
    firstname : string;
    middlename :string;
    lastname : string;
    mobile_number:  number;
    land_area: number | string;
    land_type: string;
    irrigation_source: string;
    irrigation_type:  string;
    heard_about_agribharat:  string;
    address: string;
    district:  Location;
    district_name:  string;
    taluka:  Location;
    taluka_name:  string;
    village:  Location;
    village_name:  string;
    pincode:  number;
    post_office : string;
    created_by:  string;
    __v: number;
    alternate_number: number;
    added_at:  string;
    smart_phone: boolean;
    ref_name: number | string;
    state : { name: string;  _id:string }
  }

  export interface PortfolioLocation {
    _id: string;
  name: string;
}
export interface ProfileInfo{
    crops: [];
    is_deleted:  boolean;
    _id: string;
    customer_name : string; 
    firstname : string;
    middlename :string;
    lastname : string;
    mobile_number:  number;
    land_area: number | string;
    land_type: string;
    irrigation_source: string;
    irrigation_type:  string;
    heard_about_agribharat:  string;
    address: string;
    district:  PortfolioLocation;
    district_name:  PortfolioLocation;
    taluka:  PortfolioLocation;
    taluka_name:  PortfolioLocation;
    village:  PortfolioLocation;
    village_name:  PortfolioLocation;
    pincode:  number;
    post_office : string;
    created_by:  string;
    __v: number;
    alternate_number: number;
    added_at:  string;
    smart_phone: boolean;
    ref_name: number | string;
    state : { name: string;  _id:string }
  }