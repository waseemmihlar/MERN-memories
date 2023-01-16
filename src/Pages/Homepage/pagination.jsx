import React,{useEffect} from 'react'
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./paginationStyle";
import { Link } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { getposts } from '../../actions/posts';

const Paginate = ({page}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {noOfPages} =useSelector((state)=>state.Posts)
  useEffect(() => {
   
    if(page)dispatch(getposts(page))
  }, [page]);

  return (
    <Pagination
      count={noOfPages}
      classes={{ ul: classes.ul }}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      shape="rounded"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
