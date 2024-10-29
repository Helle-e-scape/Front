import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, Modal, Text, Button } from 'react-native';
import { useWebSocket } from '../context/WebSocketContext';
import { trapUserApi } from "../_api/trapUser.api";
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';


const GridScreen = () => {
  const { sendMessage, websocketTraps = [] , setWebsocketTraps, isPlacingTrapTurn, level } = useWebSocket();
  const { user } = useUser();
  const navigation = useNavigation();
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const rows = 37;
  const columns = 20; 

  const cellWidth = windowWidth / columns;
  const cellHeight = windowHeight / rows;

  const rowOffset = Math.floor(rows / 2);
  const colOffset = Math.floor(columns / 2);

  const [selectedCell, setSelectedCell] = useState({ x: null, y: null });
  const [isModalVisible, setModalVisible] = useState(false);
  const [cellToConfirm, setCellToConfirm] = useState({ x: null, y: null });

  const levelImage = {
    1: require('../assets/images/Level1.jpg'),
    2.1: require('../assets/images/Level2-1.jpg'),
    2.2: require('../assets/images/Level2-2.jpg'),
    3.1: require('../assets/images/Level3-1.jpg'),
    3.2: require('../assets/images/Level3-2.jpg'),
  }

  useEffect(() => {
    if (websocketTraps.length === 0) {
      trapUserApi.findAllByIdRoom(user.roomId).then(response => {
        setWebsocketTraps(response.trap);
      }).catch(error => {
        console.log("Error during fetching traps: ", error);
      });
    }
  }, [websocketTraps, isPlacingTrapTurn, level]);

  setTimeout(() => {
    navigation.navigate("Trap");
  }, 5000);

  const sendCoordinates = (x, y) => {
    const data = { type: 'placeTrap', data: { x, y }, trapType: 'Spike', roomId: user.roomId, userId: user._id, level: level };
    sendMessage(data);
  };

  const onCellPress = (x, y) => {
    console.log('Cell pressed:', isPlacingTrapTurn);
    if(!isPlacingTrapTurn) return;
    setCellToConfirm({ x, y });
    setModalVisible(true);
  };

  const confirmTrapPlacement = () => {
    sendCoordinates(cellToConfirm.x, cellToConfirm.y);
    setSelectedCell(cellToConfirm);
    setModalVisible(false);
  };

  const isTrapVisible = (trap) => trap.level === level;

  const isTrap = (x, y) => {
    return websocketTraps.some(trap => trap.location.x === x && trap.location.y === y && isTrapVisible(trap));
  };

  const renderGrid = () => {
    let grid = [];

    for (let row = 0; row < rows; row++) {
      let rowCells = [];
      for (let col = 0; col < columns; col++) {
        const adjustedX = col - colOffset;
        const adjustedY = rowOffset - row;
        const isSelected = selectedCell.x === adjustedX && selectedCell.y === adjustedY;
        const hasTrap = isTrap(adjustedX, adjustedY);
        
        rowCells.push(
          <TouchableOpacity
            key={`${row}-${col}`}
            style={[
              styles.cell,
              { width: cellWidth, height: cellHeight },
              isSelected ? styles.selectedCell : null,
              hasTrap ? styles.trapCell : null
            ]}
            disabled={hasTrap}
            onPress={() => onCellPress(adjustedX, adjustedY)}
          />
        );
      }
      grid.push(
        <View key={row} style={styles.row}>
          {rowCells}
        </View>
      );
    }

    return grid;
  };

  return (
    <ImageBackground style={styles.container} source={levelImage[level]} resizeMode="stretch">
      <View style={styles.gridContainer}>{renderGrid()}</View>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to place the trap here?</Text>
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Confirm" onPress={confirmTrapPlacement} />
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default GridScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    borderWidth: 0.5,
  },
  selectedCell: {
    backgroundColor: '#ff6961',
  },
  trapCell: {
    backgroundColor: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
