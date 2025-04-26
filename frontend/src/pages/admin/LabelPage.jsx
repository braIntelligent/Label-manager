import { Box } from '@mui/material'
import Navbar from '../../components/Layout/Navbar'
import LabelList from '../../components/Labels/LabelList'

const LabelsPage = () => {
  return (
    <Box>
      <Navbar />
      <Box component="main" sx={{ p: 3 }}>
        <LabelList />
      </Box>
    </Box>
  )
}

export default LabelsPage