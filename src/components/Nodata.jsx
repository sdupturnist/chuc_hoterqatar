import { useThemeContext } from "@/context/themeContext"

export default function NoData({title}){



    const {themeLayout} =  useThemeContext()


    let color;
    switch (themeLayout.toLowerCase()) {
      case "white":
        color = "white";
        break;
      case 'chocolates':
        color = "#c89a3f";
        break;
      case 'flowers':
        color = "#E62263";
        break;
      case 'cakes':
        color = "#E79F02";
        break;
      case 'events':
        color = "#258F89";
        break;
      default:
        color = "#c89a3f";
        break;
    }


    
return(
   <div className="h-[50vh] grid items-center text-center justify-center">
   <p className={`text-center text-lg`} style={{color}}>{title}</p>
  </div>
)
}