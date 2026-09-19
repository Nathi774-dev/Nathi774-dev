using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.InputSystem;

public class QuitApplication : MonoBehaviour
{
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            Debug.Log("Application is not running...");
            Application.Quit();
        }
    }
}
