import Pagination from '@mui/material/Pagination';
import { createTheme , ThemeProvider} from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        type:'dark'
    }
})

function CustomPagination({setPage , numOfPages = 10 }) {
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
      };

    return ( 
        <ThemeProvider theme={darkTheme}>
            <Pagination 
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                count={numOfPages} 
                color="primary" 
                onChange={
                    (e) => handlePageChange(e.target.textContent)
                }
                hideNextButton
                hidePrevButton
            />
        </ThemeProvider> 
    );
}

export default CustomPagination;