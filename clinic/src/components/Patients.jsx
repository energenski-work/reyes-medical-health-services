const Patients = ({items}) => {
    return(
        <>
            {/* <h3> 
                {items.length != 0 ? "Ordered Items" : ""}
            </h3> */}
            <div className="box">
                <ul>
                    {
                        items.map((item, index) =>
                            <li key={index}>{item}</li>
                    )
                    }
                </ul>
            </div>
        </>
    )
}

export default ShoppingCart;