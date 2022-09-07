import { parseISO, format } from "date-fns";

interface Props {
    dateString:string
}

const DateFormat = ({dateString}:Props) =>{
const date = parseISO(dateString)
return (
    <time dateTime={dateString} className="text-gray-500">
        {format(date,"yyyy年mm月dd日")}
    </time>
)
    
}
export default DateFormat
