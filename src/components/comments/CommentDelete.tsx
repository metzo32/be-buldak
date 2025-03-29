// import useModal from "../../../public/hooks/useModal";
// import Modal from "../Modal";
// import { ButtonPlain } from "../Buttons";

// export default function CommentDelete() {
//   const { isModalOpen, isConfirmed, openModal, closeModal, confirmModal } =
//     useModal();

//   const handleDeleteClick = () => {
//     openModal();
//   };

//   if (isConfirmed) {
//     console.log("삭제 확인됨");
//   }

//   return (
//     <>
//       <ButtonPlain text="삭제" onClick={handleDeleteClick} isSmall />
//       <Modal
//         isModalOpen={isModalOpen}
//         title01="정말 삭제할까요?"
//         title02="되돌릴 수 없어요!"
//         btnPlainText="취소"
//         btnStrongText="삭제할래요"
//         onClose={closeModal}
//         onConfirm={confirmModal}
//       />
//     </>
//   );
// }
