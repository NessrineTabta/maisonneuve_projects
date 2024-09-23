
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';


{/* npm test si vous voulez RUN*/}
describe('Calculatrice', () => {
  test('Affiche les chiffres et les opérateurs correctement', () => {
    render(<App />); {/* render: crée machine virtuelle pour notre composant APP*/}

    {/* screen : verifie si chaque bouton est present en verifiant en trouvant LELEMENT dans le dom*/}
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
    expect(screen.getByText('AC')).toBeInTheDocument();
    expect(screen.getByText('DE')).toBeInTheDocument();
    expect(screen.getByText('.')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();addEventListener
  });

  test('Affiche les chiffres cliqués dans l\'input', () => {
    render(<App />);

    {/* fireevent: simule des clique (evenement par lutilisateur)*/}
    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('3'));

    expect(screen.getByRole('textbox')).toHaveValue('73');
  });

  test('Affiche les opérateurs correctement', () => {
    render(<App />);

    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));

    expect(screen.getByRole('textbox')).toHaveValue('7+3');
  });

  test('Calcule correctement les expressions', () => {
    render(<App />);

    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));

    expect(screen.getByRole('textbox')).toHaveValue('10');
  });

  test('Efface l\'input avec AC', () => {
    render(<App />);

    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('AC'));

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('Efface le dernier caractère avec DE', () => {
    render(<App />);

    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('DE'));

    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
