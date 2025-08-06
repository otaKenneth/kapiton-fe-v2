import { useParams } from "react-router-dom";

const ProductsDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="w-full flex flex-col gap-y-6 px-2 sm:px-4 md:px-8 pt-8 md:mt-0">
      <div className="flex gap-5">
        <div style={{ height: "700px", width: "700px" }}>
          <img src="" alt="" style={{ height: "100%", width: "100%" }} />
        </div>
        <div className="p-2 flex flex-col justify-center flex-grow flex-shrink self-auto" 
          style={{ 
            height: "700px", width: "700px" 
          }}
        >
          <div>
            <div>
              <div className="d-flex flex-row flex-wrap mb-2">
                <span></span>
              </div>
              <h1 className="text-6xl">KAPITON POLO</h1>
            </div>
            <div className="flex flex-row justify-start align-center gap-3">
              <div className="flex flex-row justify-start align-center gap3">
                <div>
                  <img src="" alt="" style={{ width: "30px"}} />
                </div>
                <div>
                  <span>Kapiton</span>
                </div>
              </div>
              <div>No Reviews</div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetailPage;
