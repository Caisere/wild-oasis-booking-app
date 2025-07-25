import styled from "styled-components";
import {formatCurrency} from '../../utils/helpers'
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";


// ui components
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// styled components
const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;



// main component
function CabinRow ({cabin})  {

    // useDeleteCabin data from the hook
    const {isDeleting, deleteCabins} = useDeleteCabin()

    // useCreateCabin data from hook
    const {isCreating, createCabin} = useCreateCabin()

    
    const {name, maxCapacity, regularPrice, discount, image, id: cabinId, description} = cabin


    // deleting cabin function
    function handleDeleteCabin() {
        // console.log('deleting')
        deleteCabins(cabinId)
    }

    // duplicate cabin function
    function handleCabinDuplicate () {
        createCabin({
            name: `A copy of ${name} cabin`,
            image,
            maxCapacity,
            regularPrice,
            discount,
            description
        })
    }

    return (
        <Table.Row>
            <Img src={image} />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
            <div type="horizontal">
                <button disabled={isCreating} onClick={handleCabinDuplicate}><HiSquare2Stack/></button>
                <Modal>
                    <Modal.Open opens='edit'>
                        <button variation='secondary'><HiPencil/></button>
                    </Modal.Open>
                    <Modal.Window name='edit'>
                        <CreateCabinForm cabinToEdit={cabin}/>
                    </Modal.Window>

                    <Modal.Open opens='delete'>
                        <button variation='danger'>
                            <HiTrash/>
                        </button>
                    </Modal.Open>
                    <Modal.Window name='delete'>
                        <ConfirmDelete disabled={isDeleting} resourceName={name} onConfirm={handleDeleteCabin}  />
                    </Modal.Window>
                </Modal>

                {/* <Menus.Menu>
                    <Menus.Toggle id={cabinId}/>

                    <Menus.List id={cabinId}>
                        <Menus.Button icon={<HiSquare2Stack/>} onClick={handleCabinDuplicate}>Duplicate</Menus.Button>
                        <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
                        <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
                    </Menus.List>
                </Menus.Menu> */}
            </div>
        </Table.Row>
    )
}

export default CabinRow


//HiSquare2Stack
// HiPencil
//HiTrash