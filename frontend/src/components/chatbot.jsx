import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ChatbotButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #3f51b5;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background-color: #303f9f;
    transform: scale(1.1);
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff4081;
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  animation: ${props => props.unread ? 'pulse 1.5s infinite' : 'none'};

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

const ChatbotIframe = styled.iframe`
  width: 350px;
  height: ${props => props.isOpen ? '500px' : '0'};
  border: none;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: height 0.3s ease;
  margin-bottom: 10px;
  background: white;
`;

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    // Listen for messages from the chatbot iframe
    const handleMessage = (event) => {
      if (event.data.type === 'BP_WEBCHAT_UNREAD') {
        if (!isOpen) {
          setUnreadCount(event.data.count);
        }
      }
      if (event.data.type === 'BP_WEBCHAT_READ') {
        setUnreadCount(0);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isOpen]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    // Reset unread count when opening
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <ChatbotContainer>
      {isLoaded && (
        <ChatbotIframe
          isOpen={isOpen}
          src="https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/06/12/20250406123939-ZVXR4YBH.json"
          title="Chatbot Assistant"
          allow="microphone"
        />
      )}
      <ChatbotButton onClick={toggleChatbot}>
        {isOpen ? '×' : '💬'}
        {unreadCount > 0 && (
          <NotificationBadge unread={unreadCount > 0}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </NotificationBadge>
        )}
      </ChatbotButton>
    </ChatbotContainer>
  );
};

export default ChatbotComponent;