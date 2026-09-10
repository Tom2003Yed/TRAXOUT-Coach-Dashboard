import { createContext, useContext, useState } from 'react';
import { trainees as initialTrainees } from './data/trainees';

export const AppContext = createContext({
	trainees: initialTrainees,
	updateTraineeStatus: () => {}
});

export function AppProvider({ children }) {
	const [trainees, setTrainees] = useState(initialTrainees);

	const updateTraineeStatus = (traineeId, status) => {
		setTrainees((currentTrainees) => currentTrainees.map((trainee) => (
			trainee.id === traineeId ? { ...trainee, status } : trainee
		)));
	};

	return (
		<AppContext.Provider value={{ trainees, updateTraineeStatus }}>
			{children}
		</AppContext.Provider>
	);
}

export const useAppContext = () => useContext(AppContext);