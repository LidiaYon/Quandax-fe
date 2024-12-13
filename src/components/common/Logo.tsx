import logo from "../../assets/logo.png"


export const Logo = () => {
    return ( <div className="flex justify-center mb-8 mt-8">
        <img 
          src={logo}
          alt="Company Logo"
          className="h-10 w-auto"  // Adjust height as needed
        />
      </div>)
}