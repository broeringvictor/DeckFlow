

interface Props {
    onClick: () => void;
}

const Btn = ({onClick}: Props) => {
    return (
        <button className="btn btn-primary"
                type="button"
                onClick={() => {onClick();}}
                    >
            Clique aqui
        </button>
    )



}

export default Btn;

