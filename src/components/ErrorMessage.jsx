
const ErrorMessage = ({ message, success }) => {

  return (
    <div className={`${success ? "text-[#19a3bf]" : "text-red-400" } font-medium p-2`}>
        {message}
    </div>
  )
}

export default ErrorMessage