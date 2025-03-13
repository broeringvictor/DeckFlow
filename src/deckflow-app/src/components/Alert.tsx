import * as React from "react";

interface Props {
    children: React.ReactNode;
}
function  Alert({ children }: Props) {
    return (
        <div className="alert alert-danger">{children}</div>
    )
}

export default Alert;