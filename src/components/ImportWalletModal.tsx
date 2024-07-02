import React, { useState } from 'react';
import styled from 'styled-components';
import Cross from '../assets/cross.svg';

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(5, 7, 10, 0.54);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ModalContent = styled.div`
	background-color: #171C23;
	padding: 2.3vw;
	border-radius: 0.5vw;
	border: none;
	width: 49.9vw;
`;

const Input = styled.textarea`
	width: 100%;
	padding: 0.78vw;
	margin-bottom: 2.2857vh;
	border-radius: 0.3vw;
	background: #20242B;
	border: 1px solid #C5C5C545;
	outline: none;
	box-sizing: border-box;
	color: #FFFFFF;
`;

const Button = styled.button`
	background-color: #DB953C;
	color: #FFFFFF;
	font-size: 1.4vw;
	font-weight: 600;
	border: none;
	padding: 10px 20px;
	cursor: pointer;
	border-radius: 4px;
	margin-top: 3.5128vh;
	margin-bottom: 2.635vh;
`;

const ModalHeader = styled.h2`
	font-size: 2.4vw;
	font-weight: 400;
	text-align: center;
	margin: 0;
`

const ModalForm = styled.div`
	margin: 6.285vh 4vw 0 4vw;
	// width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
`

const Label = styled.label`
	font-size: 1.2vw;
	font-weight: 400;
	width: 100%;
	padding-left: 1vw;
	margin-bottom: 0.714vh;
	color: #A6A2A2;
`

interface ImportWalletModalProps {
	isOpen: boolean;
	onClose: () => void;
	onImport: (name: string, mnemonic: string) => void;
}

const ImportWalletModal = ({ isOpen, onClose, onImport }: ImportWalletModalProps) => {
	const [name, setName] = useState('');
	const [mnemonic, setMnemonic] = useState('');

	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onImport(name, mnemonic);
		setName('');
		setMnemonic('');
	};

	return (
		<ModalOverlay onClick={onClose}>
			<ModalContent onClick={e => e.stopPropagation()}>

				<ModalHeader>
					Import Wallet
					<img src={Cross} alt='close' style={{ float: 'right', cursor: 'pointer', width:'1.4vw' }} onClick={onClose} />
				</ModalHeader>

				<form onSubmit={handleSubmit}>
					<ModalForm>
						<Label>
							Enter your wallet name :
						</Label>
						<Input
							required
							value={name}
							onChange={e => setName(e.target.value)}
							style={{ height: '5vh', resize: 'none' }}
						/>
						<Label>
							Enter your Mnemonic :
						</Label>
						<Input
							required
							value={mnemonic}
							onChange={e => setMnemonic(e.target.value)}
							style={{ height: '12.84vh', resize: 'none' }}
						/>
						<Button type="submit">Submit</Button>
					</ModalForm>
				</form>

			</ModalContent>
		</ModalOverlay>
	);
};

export default ImportWalletModal;