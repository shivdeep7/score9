
const TextContentArea = ({className, children}: {className?: string, children: React.ReactNode | String}) => {
    return (
        <div className={`bg-white p-4 rounded-lg shadow-lg ${className}`}>
            <p>{children}</p>
        </div>
    )
}

export default TextContentArea;