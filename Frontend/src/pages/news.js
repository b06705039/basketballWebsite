import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { Carousel, Image, Button, Divider, Modal } from "antd";
import { Post } from "../axios";
import { usePages } from "../hooks/usePages";
import List from "../components/list";

const LayoutContent = styled.div`
  padding: 0 15%;
`;

const ContentStyled = styled.div`
  display: block;
  width: 100%;
  height: 600px;
  color: #fff;
  line-height: 160px;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledImage = styled(Image)`
  height: 600px;
  display: inline-block;
  z-index: 0;
`;

const StyledButton = styled(Button)`
  height: 33px;
  background-color: #6b9abb;
  border-radius: 10px;
  float: right;
  display: flex;
`;

const EditButton = styled(Button)`
  height: 33px;
  background-color: #bb6b72;
  border-radius: 10px;
  display: flex;
  z-index: 2;
  position: absolute;
  right: 50%;
  top: 50%;
`;

export default function News() {
  const { userInfo, id } = usePages();
  const [images, setImages] = useState([]);
  const [news, setNews] = useState();
  const [edit, setEdit] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const generateModal = (post_id) => {
    console.log("in generate modal");
    Modal.confirm({
      title: "test title",
      content: <p>test content</p>,
      onOK: deletePostId,
    });
  };

  const deletePostId = () => {
    console.log("in handle edit");

    // Post.DeletePost(post_id)
  };

  useMemo(async () => {
    const imageResult = await Post.GetTypeContent("news_image");
    setImages(() => imageResult);
    const newsResult = await Post.GetTypeContent("news");
    setNews(() => newsResult);
  }, [userInfo]);

  console.log("return result: ", images, news);

  return (
    <>
      <div className="ant-layout-content" style={{ height: "1000px" }}>
        <LayoutContent className="site-layout-content">
          {id === "administer" && (
            <Divider orientation="right">
              {edit ? (
                <StyledButton onClick={() => setEdit(false)}>
                  取消編輯
                </StyledButton>
              ) : (
                <StyledButton onClick={() => setEdit(true)}>編輯</StyledButton>
              )}
            </Divider>
          )}
          <Carousel autoplay={true}>
            {images.map((image, index) => {
              return (
                <ContentStyled key={index}>
                  {edit && (
                    <EditButton
                      onClick={() => {
                        setEdit(true);
                        generateModal(image.post_id);
                      }}
                    >
                      刪除
                    </EditButton>
                  )}
                  <StyledImage
                    preview={false}
                    src={image.content}
                  ></StyledImage>
                </ContentStyled>
              );
            })}
          </Carousel>
          <List
            titleName={"News"}
            dataSource={news}
            catagoryColName={"title_category"}
            contentColName={"title_content"}
            urlColName={"content"}
            edit={edit}
            generateModal={generateModal}
          />
        </LayoutContent>
      </div>
    </>
  );
}
