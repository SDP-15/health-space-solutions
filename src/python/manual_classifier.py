from typing import List

# Sensor ids
back_top_left = 0
back_top_right = 1
back_bottom_middle = 2
seat_back_middle = 3
seat_front_left = 4
seat_front_right = 5


def score_posture(data: List[int], active_threshold: int) -> int:
    """
    Scores the posture and gives a reason for the score.

    :return: Returns the score a long with the reason for the score
    """
    data_formatted = [value >= active_threshold for value in data]

    sitting = is_sitting(data_formatted)
    score = 1
    reason = 0
    if not sitting:
        return score, -1

    if not data_formatted[seat_front_left]:  # Right leg crossed over left
        score = 0
        reason = 1
        print("Right leg crossed over left leg.")
    elif not data_formatted[seat_front_right]:  # Left leg crossed over right
        score = 0
        reason = 2
        print("Left leg crossed over right leg.")
    elif (
        not data_formatted[seat_back_middle] or not data_formatted[back_bottom_middle]
    ):  # Slouching
        score = 0
        reason = 3
        print("You are slouching.")
    elif (
        not data_formatted[back_top_left] or not data_formatted[back_top_right]
    ):  # Hunching
        score = 0
        reason = 4
        print("You are hunching forward.")
    return score, reason


def is_sitting(data: List[bool]) -> bool:
    """
    Returns true if we consider someone to be sitting on the chair.

    :param data: dictionary mapping from the sensor id to its reading.
    """
    return data[seat_back_middle] or data[seat_front_left] or data[seat_front_right]
