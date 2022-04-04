import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ImageIcon from '@mui/icons-material/Image';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const ArticleCard = ({ type, date, authors, annotation, keywords, id }) => {
    let icon = null;

    if (type === 'pdf') {
        icon = <PictureAsPdfIcon />;
    } else if (type === 'pptx') {
        icon = <SlideshowIcon />;
    } else if (type === 'photos') {
        icon = <ImageIcon />;
    } else if (type === 'constructor') {
        icon = <TextSnippetIcon />;
    }

    return (
        <Link to={`/${type}/${id}`} className="menu__link">
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'blue' }} aria-label="recipe">
                            {icon}
                        </Avatar>
                    }
                    title={authors.slice(0, authors.length - 2)}
                    subheader={`${+date[2] < 10 ? '0'+date[2] : date[2]}.${+date[1] < 10 ? '0'+date[1] : date[1]}.${date[0]}`}
                />
                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        Ключевые слова: {keywords}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {annotation}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Link>
    )
}

export default ArticleCard;
