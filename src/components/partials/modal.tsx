import * as Dialog from '@radix-ui/react-dialog';

//todo abstract out dialog
// test modal funct

//buy, sell only the buy and sell relevant stuff
export interface ModalProps {
  openButton: React.ReactNode;
  children: React.ReactNode;
  title: string;
}
export default function Modal({openButton, children, title}: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{openButton}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-gray-700 opacity-70 fixed inset-0 w-screen h-screen' />
        <Dialog.Content className='fixed inset-0 w-screen h-screen flex justify-center items-center'>
          <div className='bg-white h-auto w-96 rounded-lg py-2 px-3 flex flex-col'>
            <Dialog.Title>{title}</Dialog.Title>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
