using System;
using JetBrains.Annotations;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.SceneManagement;

public class CollisionHandler : MonoBehaviour
{
    [SerializeField] float delayTime = 3f;
    [SerializeField] AudioClip winSFX;
    [SerializeField] AudioClip loseSFX;
    [SerializeField] ParticleSystem successParticles;
    [SerializeField] ParticleSystem crashParticles;
    AudioSource audioSource;

    bool isControllable = true;
    bool isCollidable = true;

    private void Start()
    {
        audioSource = GetComponent<AudioSource>();
    }

    void Update()
    {
        RespondToDebugKeys();
    }

    void RespondToDebugKeys()
    {
        if (Keyboard.current.lKey.wasPressedThisFrame)
        {
            LoadNextLevel();
        } else if (Keyboard.current.cKey.wasPressedThisFrame)
        {
            isCollidable = !isCollidable;
        }
    }

    private void OnCollisionEnter(Collision other)
    {
        CheckPlayerState(other);
    }

    void CheckPlayerState(Collision other)
    {

        if (!isControllable || !isCollidable) { return; }

        switch (other.gameObject.tag)
        {
            case "Finished":
                StartSuccessSequence();
                break;
            case "Friendly":
                Debug.Log("Start");
                break;
            default:
                StartCrashSequence(other);
                break;
        }
        
    }

    private void StartSuccessSequence()
    {
        // TODO: Add  SFX and particles
        isControllable = false;

        if (audioSource == null || winSFX == null || successParticles == null)
        {
            Debug.Log("There is no sound detected.");
        } else
        {
            audioSource.Stop();
            audioSource.PlayOneShot(winSFX);
            successParticles.Play();
            GetComponent<Movement>().enabled = false;
            Invoke("LoadNextLevel", delayTime);
        }
    }

    private void StartCrashSequence(Collision other)
    {
        // TODO: Add SFX and particles
        isControllable = false;

        if (loseSFX == null || audioSource == null || crashParticles == null)
        {
            Debug.Log("No sound is detected!");
        } else
        {
            audioSource.Stop();
            audioSource.PlayOneShot(loseSFX);
            crashParticles.Play();
            GetComponent<Movement>().enabled = false;
            Invoke("ReloadScene", delayTime);
        }
    }

    void LoadNextLevel()
    {
        int currentScene = SceneManager.GetActiveScene().buildIndex;
        int nextScene = currentScene + 1;

        if (nextScene == SceneManager.sceneCountInBuildSettings)
        {
            nextScene = 0;
        }

        SceneManager.LoadScene(nextScene);
    }

    void ReloadScene()
    {
        string currentScene = SceneManager.GetActiveScene().name;
        SceneManager.LoadScene(currentScene);
    }
}
