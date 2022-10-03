import * as React from 'react';
import './Faq.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';

const Faq = () => {
  function createData(nr, summary, typography) {
    return { nr, summary, typography };
  }
  const rows = [
    createData(
      1,
      "Rozwiązywanie problemów: Error - 'dane są w złym formacie'",
      "Prawdopodobnie importowany plik nie jest w wymaganym formacie. Przejdź do zakładki 'Jak powinny być sformatowane dane w pliku rozszerzeniem .xml?', aby dowiedzieć się więcej."
    ),
    createData(
      2,
      'Czy mogę wrcócić do stworzonych wcześniej projektów?',
      "Tak, wystarczy przejść do zakładki 'MOJE PRZYDZIAŁY' i wybrać jeden z wcześniej zapisanych projektów"
    ),
    createData(3, 'Jak stowrzyć konto', "Należy przejść do zakładki 'REJESTRACJA'"),
    createData(
      4,
      'Jak powinny być sformatowane dane w pliku rozszerzeniem .xml?',
      'Dane powinny zawierać kolejno następujące kolumny: imię, nazwisko, wiek, płeć'
    ),
    createData(5, 'Jak wyeksportować stworzony projekt?', 'Pracujemy nad tym :) Eksport będzie dostępny w kolejnej wersji programu'),
    createData(6, 'Prawa autorskie', "Aplikacja powstała stworzona na licencji 'MIT License'. Copyright (c) 2022 Team-Koncentrator")
  ];

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      <main>
        <div className='heroContent'>
          <div className='faq-intro'>
            <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
              FAQ
            </Typography>
            <Typography variant='h6' align='center' color='textSecondary' component='p'>
              Poniżej znajduje się lista najczęściej zadawanych pytań. Jeżeli nie znalazłeś odpowiedzi, skontaktuj się z nami:{' '}
              <Link href='mailto:wojtkolos@gmail.com}' color='inherit'>
                {'kontakt'}
              </Link>
            </Typography>
          </div>
        </div>

        <div className='faq-accordition'>
          {rows.map((row) => (
            <Accordion expanded={expanded === 'panel' + row.nr} onChange={handleChange('panel' + row.nr)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                <Typography>{row.summary}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{row.typography}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </main>
    </>
  );
};

export default Faq;
